import { JsonNull } from "./JsonNull";
import { JsonBool } from "./JsonBool";
import { JsonNumber } from "./JsonNumber";
import { JsonString } from "./JsonString";
import { JsonArray } from "./JsonArray";
import { JsonObject } from "./JsonObject";

export type TypeJSONValue = JsonNull | JsonBool | JsonNumber | JsonString | JsonArray | JsonObject;