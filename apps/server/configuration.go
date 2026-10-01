package main

import "os"

type configuration struct {
	serverAddress string
}

func loadConfiguration() configuration {
	serverAddress := os.Getenv("SERVER_ADDRESS")
	if serverAddress == "" {
		serverAddress = "127.0.0.1:8080"
	}

	return configuration{
		serverAddress: serverAddress,
	}
}
