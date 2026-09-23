package server

import (
	"errors"
	"strconv"
	"strings"
)

type Configuration struct {
	Port        int
	DatabaseURL string
}

func ReadConfiguration(lookupEnvironment func(string) (string, bool)) (Configuration, error) {
	portValue, exists := lookupEnvironment("PORT")
	if !exists {
		portValue = "3000"
	}

	port, parseError := strconv.ParseUint(portValue, 10, 16)
	if parseError != nil || port == 0 {
		return Configuration{}, errors.New("PORT must be a decimal integer between 1 and 65535")
	}

	databaseURL, exists := lookupEnvironment("DATABASE_URL")
	if !exists || strings.TrimSpace(databaseURL) == "" {
		return Configuration{}, errors.New("DATABASE_URL is required")
	}

	return Configuration{
		Port:        int(port),
		DatabaseURL: databaseURL,
	}, nil
}
