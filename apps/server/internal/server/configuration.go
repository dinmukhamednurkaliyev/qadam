package server

import (
	"errors"
	"strconv"
)

type Configuration struct {
	Port int
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

	return Configuration{Port: int(port)}, nil
}
