import { express } from "express";
import { Broker } from "./rmq/broker";
const app = express();
import axios from "axios";
const port = 3021;

const broker = Broker.getInstance();

app.post("/employees/:socketId/:service/:name/:address/:course", (req, res) => {
  const topicName = req.params.service + "_ADD"; //STUDENT_ADD
  const body = {
    requestId: req.headers.requestId,
    name: req.params.name,
    address: req.params.address,
    course: req.params.course,
  };
  const response = broker.PublicMessageToTopic(topicName, body);
  res.json(response);
});

app.put(
  "/employees/:socketId/:service/:id/:name/:address/:course",
  (req, res) => {
    const topicName = req.params.service + "_UPDATE";
    // let reqId = req.headers.requestId;
    const body = {
      id: req.params.id,
      name: req.params.name,
      address: req.params.address,
      course: req.params.course,
    };
    const response = broker.PublicMessageToTopic(topicName, body);
    res.json(response);
  }
);

app.delete("/employees/:socketId/:service/:id", (req, res) => {
  let id = req.params.id;
  // let reqId = req.headers.requestId;
  let topicName = req.params.service + "_DELETE";
  const response = broker.PublicMessageToTopic(topicName, id);
  res.json(response);
});

app.get("/home/:socketId", async (req, res) => {
  const url = "http://localhost:3005/student";
  const result = await axios.get(url);
  res.status(200).json(result.data);
});

app.listen(port, () => {
  console.log("listening on *:3002");
  broker.listenToServices("API_GATEWAY_SERVICE", (result) => {
    const { message } = result;
    console.log("message recieved from MS to gateway lisnter", message);
  });
});
