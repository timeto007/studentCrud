"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exchange = {
    Topics: [
        {
            TopicName: "STUDENT_ADD",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "POST",
            Subscribers: [
                {
                    Service: "STUDENT_SERVICE",
                    OnSuccessTopicsToPush: ["STUDENT_ADDED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "STUDENT_ADD-STUDENT_SERVICE",
                },
            ],
        },
        {
            TopicName: "STUDENT_ADDED",
            Publishers: ["STUDENT_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "STUDENT_ADDED-API_GATEWAY_SERVICE",
                },
            ],
        },
        {
            TopicName: "STUDENT_UPDATE",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "POST",
            Subscribers: [
                {
                    Service: "STUDENT_SERVICE",
                    OnSuccessTopicsToPush: ["STUDENT_UPDATED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "STUDENT_UPDATE-STUDENT_SERVICE",
                },
            ],
        },
        {
            TopicName: "STUDENT_UPDATED",
            Publishers: ["STUDENT_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "STUDENT_UPDATED-API_GATEWAY_SERVICE",
                },
            ],
        },
        {
            TopicName: "STUDENT_DELETE",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "PUT",
            Subscribers: [
                {
                    Service: "STUDENT_SERVICE",
                    OnSuccessTopicsToPush: ["STUDENT_DELETED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "STUDENT_DELETE-STUDENT_SERVICE",
                },
            ],
        },
        {
            TopicName: "STUDENT_DELETED",
            Publishers: ["STUDENT_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "STUDENT_DELETED-API_GATEWAY_SERVICE",
                },
            ],
        },
    ],
};
exports.default = Exchange;
//# sourceMappingURL=Exchange.js.map