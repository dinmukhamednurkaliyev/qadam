package database

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgxpool"
)

const (
	maximumConnections = 10
	connectionTimeout  = 5 * time.Second
)

func Open(parentContext context.Context, databaseURL string) (*pgxpool.Pool, error) {
	configuration, configurationError := pgxpool.ParseConfig(databaseURL)
	if configurationError != nil {
		return nil, errors.New("DATABASE_URL contains invalid database configuration")
	}

	configuration.MaxConns = maximumConnections
	configuration.ConnConfig.ConnectTimeout = connectionTimeout
	if configuration.MinConns > configuration.MaxConns || configuration.MinIdleConns > configuration.MaxConns {
		return nil, fmt.Errorf("database minimum connections must not exceed %d", maximumConnections)
	}

	connectionContext, cancelConnection := context.WithTimeout(parentContext, connectionTimeout)
	defer cancelConnection()

	pool, poolError := pgxpool.NewWithConfig(connectionContext, configuration)
	if poolError != nil {
		return nil, fmt.Errorf("create database pool: %w", poolError)
	}

	if connectionError := pool.Ping(connectionContext); connectionError != nil {
		pool.Close()

		if connectionContext.Err() != nil {
			return nil, fmt.Errorf("connect to database: %w", connectionContext.Err())
		}

		var postgresError *pgconn.PgError
		if errors.As(connectionError, &postgresError) {
			return nil, fmt.Errorf("database rejected the connection (SQLSTATE %s)", postgresError.Code)
		}

		return nil, errors.New("database connection failed; check availability and DATABASE_URL")
	}

	return pool, nil
}
