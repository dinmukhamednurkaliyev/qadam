package main

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"net"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/dinmukhamednurkaliyev/qadam/apps/server/internal/server"
)

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	if runError := run(logger); runError != nil {
		logger.Error("server failed", "error", runError)
		os.Exit(1)
	}
}

func run(logger *slog.Logger) error {
	configuration, configurationError := server.ReadConfiguration(os.LookupEnv)
	if configurationError != nil {
		return configurationError
	}

	shutdownSignal, stopSignals := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stopSignals()

	httpServer := server.New(configuration, logger)
	listener, listenError := net.Listen("tcp", httpServer.Addr)
	if listenError != nil {
		return fmt.Errorf("listen: %w", listenError)
	}

	serverResult := make(chan error, 1)
	go func() {
		serverResult <- httpServer.Serve(listener)
	}()
	logger.Info("server started", "address", listener.Addr().String())

	select {
	case serveError := <-serverResult:
		return fmt.Errorf("serve: %w", serveError)
	case <-shutdownSignal.Done():
		stopSignals()
	}

	shutdownContext, cancelShutdown := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancelShutdown()

	if shutdownError := httpServer.Shutdown(shutdownContext); shutdownError != nil {
		_ = httpServer.Close()
		return fmt.Errorf("shutdown: %w", shutdownError)
	}

	if serveError := <-serverResult; !errors.Is(serveError, http.ErrServerClosed) {
		return fmt.Errorf("serve: %w", serveError)
	}

	logger.Info("server stopped")
	return nil
}
