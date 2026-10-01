package main

import (
	"net/http"
	"time"
)

func runApplication() error {
	applicationConfiguration := loadConfiguration()

	router := http.NewServeMux()
	router.HandleFunc("GET /health", handleHealth)

	server := http.Server{
		Addr:              applicationConfiguration.serverAddress,
		Handler:           router,
		ReadHeaderTimeout: 5 * time.Second,
	}

	return server.ListenAndServe()
}
