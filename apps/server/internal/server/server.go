package server

import (
	"io"
	"log/slog"
	"net/http"
	"strconv"
	"time"
)

func New(configuration Configuration, logger *slog.Logger) *http.Server {
	router := http.NewServeMux()

	writeResponse := func(writer http.ResponseWriter, status int, body string) {
		writer.Header().Set("Content-Type", "application/json; charset=utf-8")
		writer.WriteHeader(status)
		if _, writeError := io.WriteString(writer, body); writeError != nil {
			logger.Warn("response write failed", "error", writeError)
		}
	}

	router.HandleFunc("GET /health", func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Cache-Control", "no-store")
		writeResponse(writer, http.StatusOK, `{"status":"ok"}`)
	})

	router.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		writeResponse(writer, http.StatusNotFound,
			`{"error":{"code":"NOT_FOUND","message":"The requested resource was not found."}}`)
	})

	return &http.Server{
		Addr:              ":" + strconv.Itoa(configuration.Port),
		Handler:           router,
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       15 * time.Second,
		WriteTimeout:      15 * time.Second,
		IdleTimeout:       60 * time.Second,
		ErrorLog:          slog.NewLogLogger(logger.Handler(), slog.LevelError),
	}
}
