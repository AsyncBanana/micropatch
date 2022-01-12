import { test } from "uvu";
import * as assert from "uvu/assert";
import patch from "../dist/index.js";
import diff from "microdiff";

test("basic diff-patch", () => {
	const obj1 = { one: true, two: true, three: false };
	const obj2 = Object.assign({}, obj1);
	obj2.one = false;
	delete obj2.three;
	obj2.four = true;
	assert.equal(patch(obj2, diff(obj2, obj1)), obj1);
});

test.run();
