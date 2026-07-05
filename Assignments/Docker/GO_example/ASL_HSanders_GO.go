package main

import (
	"fmt"
	"time"
)

func main() {
	currentTime := time.Now().Format("2006-01-02 15:04:05")
	greeting := "Hello ASL!"

	fmt.Printf(" %s, The current time is: %s\n", greeting, currentTime)
}
