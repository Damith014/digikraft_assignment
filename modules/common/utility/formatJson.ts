import { StationData } from "../../indego/controller/indego.controller";

export const formatJson = (data: StationData[]) => {
  let jsonArr_string = "[";
  for (let i = 0; i < data.length; i++) {
    jsonArr_string += JSON.stringify(data[i]);
    if (i < data.length - 1) {
      jsonArr_string += ",";
    }
  }
  jsonArr_string += "]";
  return jsonArr_string;
};
