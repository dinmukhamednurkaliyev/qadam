package main

import (
	"fmt"
	"os"
)

func main() {
	if applicationError := runApplication(); applicationError != nil {
		fmt.Fprintf(os.Stderr, "HTTP server failed: %v\n", applicationError)
		os.Exit(1)
	}
}
