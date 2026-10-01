package main

import "net/http"

func handleHealth(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusOK)
}
