CREATE TYPE "public"."application_status" AS ENUM('submitted', 'reviewing', 'interview', 'offered', 'hired', 'rejected', 'withdrawn');--> statement-breakpoint
CREATE TYPE "public"."employment_type" AS ENUM('full_time', 'part_time', 'contract', 'internship', 'temporary');--> statement-breakpoint
CREATE TYPE "public"."organization_role" AS ENUM('owner', 'recruiter');--> statement-breakpoint
CREATE TYPE "public"."organization_status" AS ENUM('draft', 'pending', 'verified', 'rejected', 'suspended');--> statement-breakpoint
CREATE TYPE "public"."platform_role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TYPE "public"."vacancy_status" AS ENUM('draft', 'published', 'closed', 'archived');--> statement-breakpoint
CREATE TYPE "public"."workplace_type" AS ENUM('onsite', 'hybrid', 'remote');--> statement-breakpoint
CREATE TABLE "applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"vacancy_id" uuid NOT NULL,
	"status" "application_status" DEFAULT 'submitted' NOT NULL,
	"cover_letter" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"withdrawn_at" timestamp with time zone,
	CONSTRAINT "applications_user_id_vacancy_id_unique" UNIQUE("user_id","vacancy_id")
);
--> statement-breakpoint
CREATE TABLE "application_status_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"application_id" uuid NOT NULL,
	"from_status" "application_status",
	"to_status" "application_status" NOT NULL,
	"changed_by_user_id" uuid,
	"note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bookmarks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"vacancy_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "bookmarks_user_id_vacancy_id_unique" UNIQUE("user_id","vacancy_id")
);
--> statement-breakpoint
CREATE TABLE "candidate_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"headline" varchar(255),
	"bio" text,
	"phone" varchar(50),
	"resume_url" varchar(2048),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "candidate_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"region_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "locations_region_id_name_unique" UNIQUE("region_id","name")
);
--> statement-breakpoint
CREATE TABLE "organization_invitations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"email" varchar(255) NOT NULL,
	"role" "organization_role" NOT NULL,
	"token_hash" varchar(255) NOT NULL,
	"invited_by_user_id" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"accepted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role" "organization_role" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "organization_members_organization_id_user_id_unique" UNIQUE("organization_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_by_user_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"legal_name" varchar(255) NOT NULL,
	"registration_country_code" varchar(2) NOT NULL,
	"registration_number" varchar(100) NOT NULL,
	"contact_email" varchar(255) NOT NULL,
	"website" varchar(2048),
	"description" text NOT NULL,
	"status" "organization_status" DEFAULT 'draft' NOT NULL,
	"verified_at" timestamp with time zone,
	"verified_by_user_id" uuid,
	"rejection_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "regions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"country_code" varchar(2) NOT NULL,
	"name" varchar(255) NOT NULL,
	"code" varchar(50) NOT NULL,
	CONSTRAINT "regions_country_code_code_unique" UNIQUE("country_code","code")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token_hash" varchar(255) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"platform_role" "platform_role" DEFAULT 'user' NOT NULL,
	"email_verified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vacancies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"created_by_user_id" uuid NOT NULL,
	"location_id" uuid,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"status" "vacancy_status" DEFAULT 'draft' NOT NULL,
	"employment_type" "employment_type",
	"workplace_type" "workplace_type",
	"salary_from" integer,
	"salary_to" integer,
	"salary_currency" varchar(3),
	"published_at" timestamp with time zone,
	"closed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "vacancies_salary_from_nonnegative" CHECK ("vacancies"."salary_from" is null or "vacancies"."salary_from" >= 0),
	CONSTRAINT "vacancies_salary_to_nonnegative" CHECK ("vacancies"."salary_to" is null or "vacancies"."salary_to" >= 0),
	CONSTRAINT "vacancies_salary_range_valid" CHECK ("vacancies"."salary_from" is null or "vacancies"."salary_to" is null or "vacancies"."salary_from" <= "vacancies"."salary_to"),
	CONSTRAINT "vacancies_salary_currency_required" CHECK (("vacancies"."salary_from" is null and "vacancies"."salary_to" is null) or "vacancies"."salary_currency" is not null)
);
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_vacancy_id_vacancies_id_fk" FOREIGN KEY ("vacancy_id") REFERENCES "public"."vacancies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "application_status_history" ADD CONSTRAINT "application_status_history_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "application_status_history" ADD CONSTRAINT "application_status_history_changed_by_user_id_users_id_fk" FOREIGN KEY ("changed_by_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_vacancy_id_vacancies_id_fk" FOREIGN KEY ("vacancy_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidate_profiles" ADD CONSTRAINT "candidate_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_invitations" ADD CONSTRAINT "organization_invitations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_invitations" ADD CONSTRAINT "organization_invitations_invited_by_user_id_users_id_fk" FOREIGN KEY ("invited_by_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_members" ADD CONSTRAINT "organization_members_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_members" ADD CONSTRAINT "organization_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_created_by_user_id_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_verified_by_user_id_users_id_fk" FOREIGN KEY ("verified_by_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_created_by_user_id_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "applications_user_id_status_index" ON "applications" USING btree ("user_id","status");--> statement-breakpoint
CREATE INDEX "applications_vacancy_id_status_index" ON "applications" USING btree ("vacancy_id","status");--> statement-breakpoint
CREATE INDEX "application_status_history_application_id_created_at_index" ON "application_status_history" USING btree ("application_id","created_at");--> statement-breakpoint
CREATE INDEX "bookmarks_vacancy_id_index" ON "bookmarks" USING btree ("vacancy_id");--> statement-breakpoint
CREATE INDEX "locations_region_id_index" ON "locations" USING btree ("region_id");--> statement-breakpoint
CREATE UNIQUE INDEX "organization_invitations_token_hash_unique" ON "organization_invitations" USING btree ("token_hash");--> statement-breakpoint
CREATE INDEX "organization_invitations_organization_id_index" ON "organization_invitations" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "organization_invitations_email_index" ON "organization_invitations" USING btree ("email");--> statement-breakpoint
CREATE INDEX "organization_invitations_expires_at_index" ON "organization_invitations" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "organization_members_user_id_index" ON "organization_members" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "organizations_slug_unique" ON "organizations" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "organizations_registration_unique" ON "organizations" USING btree ("registration_country_code","registration_number");--> statement-breakpoint
CREATE INDEX "organizations_created_by_user_id_index" ON "organizations" USING btree ("created_by_user_id");--> statement-breakpoint
CREATE INDEX "organizations_status_index" ON "organizations" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "sessions_token_hash_unique" ON "sessions" USING btree ("token_hash");--> statement-breakpoint
CREATE INDEX "sessions_user_id_index" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "sessions_expires_at_index" ON "sessions" USING btree ("expires_at");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_normalized_unique" ON "users" USING btree (lower("email"));--> statement-breakpoint
CREATE INDEX "vacancies_organization_id_index" ON "vacancies" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "vacancies_location_id_index" ON "vacancies" USING btree ("location_id");--> statement-breakpoint
CREATE INDEX "vacancies_status_published_at_index" ON "vacancies" USING btree ("status","published_at");