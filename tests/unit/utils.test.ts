import { it, describe } from "vitest";
import { createTemplateFilename } from "../../src/utils";
import simpleText from "../fixtures/templates/simpleText";
import { expect } from "vitest";

describe("createTemplateFilename", () => {
  it("should return a unique filename for different templates", () => {
    const templateA = simpleText("foo", "bar");
    const hashA = createTemplateFilename(templateA);

    const templateB = simpleText("foo2", "baz");
    const hashB = createTemplateFilename(templateB);

    expect(hashA).not.toBe(hashB);
  });

  it("should return an identical filename for identical templates", () => {
    const templateA = simpleText("foo", "bar");
    const hashA = createTemplateFilename(templateA);

    const templateB = simpleText("foo", "bar");
    const hashB = createTemplateFilename(templateB);

    expect(hashA).toBe(hashB);
  });
});
