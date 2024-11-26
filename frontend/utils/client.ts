import ky from "ky";
import { BASE_URL } from "./api.config";

export const client = ky.create({
  prefixUrl: BASE_URL,
  retry: {
    limit: 2,
    methods: ['get', 'post', 'put', 'delete'],
    statusCodes: [408, 413, 429, 500, 502, 503, 504]
  },
  timeout: 30000
});