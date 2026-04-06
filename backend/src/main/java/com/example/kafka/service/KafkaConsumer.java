package com.example.kafka.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class KafkaConsumer {

    @KafkaListener(topics = "test-topic", groupId = "my-demo-group")
    public void consume(String message) {
        log.info(String.format("Consumed new message -> %s", message));
    }
}
