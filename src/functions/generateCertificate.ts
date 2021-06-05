import { document } from "../utils/dynamodbClient";

interface ICreateCertificate {
  id: string;
  name: string;
  grade: string;
}

interface IResponse {
  statusCode: number;
  body: string;
  headers: {
    "Content-type": string;
  }
}

export const handle = async (event)=>{
  const { id, name, grade } = JSON.parse(event.body) as ICreateCertificate

  await document.put({
    TableName: "users_certificates",
    Item: {
      id,
      name,
      grade
    }
  }).promise();

  const response: IResponse = {
    statusCode: 201,
    body: JSON.stringify({
      message: "Certificate Created!"
    }),
    headers: {
      "Content-type": "application/json"
    }
  }
  return response
}
