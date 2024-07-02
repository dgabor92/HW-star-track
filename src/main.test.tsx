import { describe, it, expect } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("Checklist API", () => {
  it("should return error if baseURL not defined", async () => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    axios.get(baseURL + "/checklists").catch((err) => {
      expect(err).toEqual(new Error("VITE_BASE_URL is not defined"));
    });
  });
});

describe("Checklist API", () => {
  it("should return checklist", async () => {
    const baseURL = import.meta.env.VITE_BASE_URL;

    const mock = new MockAdapter(axios);
    const data = {
      checklist: [
        {
          id: 1,
          driveNumber: "123",
          name: "checklist",
          checkOccasion: [
            {
              id: 1,
              title: "title",
              code: "code",
              checkItem: [
                {
                  title: "title",
                  code: "code",
                  status: "CHECKED",
                  checkResultRemark: "remark",
                },
              ],
            },
          ],
        },
      ],
    };
    mock.onGet(baseURL + "/checklists").reply(200, data);
    axios.get(baseURL + "/checklists").then((res) => {
      expect(res.data).toEqual(data);
    });
  });
});
describe("Checklist API", () => {
  it("should return error if status is not 200", async () => {
    const baseURL = import.meta.env.VITE_BASE_URL;

    const mock = new MockAdapter(axios);
    mock.onGet(baseURL + "/checklist").reply(404);
    axios.get(baseURL + "/checklist").catch((err) => {
      expect(err.toString()).toEqual(
        "Error: Request failed with status code 404"
      );
    });
  });
});

describe("Checklist API", () => {
  it("should return selected checklist", async () => {
    const baseURL = import.meta.env.VITE_BASE_URL;

    const mock = new MockAdapter(axios);
    const data = {
      id: 1,
      driveNumber: "123",
      name: "checklist",
      checkOccasion: [
        {
          id: 1,
          title: "title",
          code: "code",
          checkItem: [
            {
              title: "title",
              code: "code",
              status: "CHECKED",
              checkResultRemark: "remark",
            },
          ],
        },
      ],
    };
    mock.onGet(baseURL + "/check/start/123").reply(200, data);
    axios.get(baseURL + "/check/start/123").then((res) => {
      expect(res.data).toEqual(data);
    });
  });
});

describe("Checklist API", () => {
  it("should create a new checklist", async () => {
    const baseURL = import.meta.env.VITE_BASE_URL;

    const mock = new MockAdapter(axios);
    const requestData = {
      driveNumber: "123",
      name: "new checklist",
      checkOccasion: [],
    };
    const responseData = {
      id: 2,
      ...requestData,
    };
    mock.onPost(baseURL + "/checklists", requestData).reply(201, responseData);

    const res = await axios.post(baseURL + "/checklists", requestData);
    expect(res.status).toBe(201);
    expect(res.data).toEqual(responseData);
  });
});

describe("Checklist API", () => {
  it("should update a checklist", async () => {
    const baseURL = import.meta.env.VITE_BASE_URL;

    const mock = new MockAdapter(axios);
    const requestData = {
      name: "updated checklist",
    };
    const responseData = {
      id: 1,
      driveNumber: "123",
      name: "updated checklist",
      checkOccasion: [
        {
          id: 1,
          title: "title",
          code: "code",
          checkItem: [
            {
              title: "title",
              code: "code",
              status: "CHECKED",
              checkResultRemark: "remark",
            },
          ],
        },
      ],
    };
    mock.onPut(baseURL + "/checklists/1", requestData).reply(200, responseData);

    const res = await axios.put(baseURL + "/checklists/1", requestData);
    expect(res.status).toBe(200);
    expect(res.data).toEqual(responseData);
  });
});

describe("Checklist API", () => {
  it("should delete a checklist", async () => {
    const baseURL = import.meta.env.VITE_BASE_URL;

    const mock = new MockAdapter(axios);
    mock.onDelete(baseURL + "/checklists/1").reply(204);

    const res = await axios.delete(baseURL + "/checklists/1");
    expect(res.status).toBe(204);
  });
});

describe("Checklist API", () => {
  it("should return error for invalid URL", async () => {
    const baseURL = import.meta.env.VITE_BASE_URL;

    const mock = new MockAdapter(axios);
    mock.onGet(baseURL + "/invalid-url").reply(404, {
      message: "Not Found",
    });

    try {
      await axios.get(baseURL + "/invalid-url");
    } catch (err) {
      expect(err.response.status).toBe(404);
      expect(err.response.data.message).toBe("Not Found");
    }
  });
});

describe("Checklist API", () => {
  it("should return an empty checklist list", async () => {
    const baseURL = import.meta.env.VITE_BASE_URL;

    const mock = new MockAdapter(axios);
    mock.onGet(baseURL + "/checklists").reply(200, {
      checklist: [],
    });

    const res = await axios.get(baseURL + "/checklists");
    expect(res.status).toBe(200);
    expect(res.data.checklist).toEqual([]);
  });
});

describe("Checklist API", () => {
  it("should return checklist item details", async () => {
    const baseURL = import.meta.env.VITE_BASE_URL;

    const mock = new MockAdapter(axios);
    const data = {
      id: 1,
      title: "checklist item title",
      code: "item code",
      status: "CHECKED",
      checkResultRemark: "remark",
    };
    mock.onGet(baseURL + "/checklist/items/1").reply(200, data);

    const res = await axios.get(baseURL + "/checklist/items/1");
    expect(res.status).toBe(200);
    expect(res.data).toEqual(data);
  });
});
