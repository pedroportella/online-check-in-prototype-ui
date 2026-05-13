import { promises } from "node:fs";
import path from 'node:path';

// test if input token exists
const jsonVDSOutputDir = 'tokens';
const jsonVDSOutputFileName = 'vds.json';
const jsonVDSOutputFilePath = path.resolve(jsonVDSOutputDir, jsonVDSOutputFileName);

// test if input token exists
const jsonTypographyOutputDir = 'tokens';
const jsonTypographyOutputFileName = 'typography.json';
const jsonTypographyOutputFilePath = path.resolve(jsonTypographyOutputDir, jsonTypographyOutputFileName);

// test if combined ouput token exists
const cssOutputDir = 'src/css/styles';
const cssOutputFileName = 'vds.css';
const cssOutputFilePath = path.resolve(cssOutputDir, cssOutputFileName);

// test if input & output transformation is valid
const tokenTestObject = {
  "vds": {
    "color": {"json": `color`, "css": `--vds-color`},
    "fontSizeMap": {"json": `fontSizeMap`, "css": `--vds-font-size-map`},
    "mediaQuery": {"json": `mediaQuery`, "css": `--vds-media-query`}
  },
  "typography": {
    "phone": {
      "h1": {"json": `h1`, "css": `--typography-phone-h1`},
      "h2": {"json": `h2`, "css": `--typography-phone-h2`},
      "h3": {"json": `h3`, "css": `--typography-phone-h3`},
      "h4": {"json": `h4`, "css": `--typography-phone-h4`},
      "h5": {"json": `h5`, "css": `--typography-phone-h5`},
      "h6": {"json": `h6`, "css": `--typography-phone-h6`},
      "body": {"json": `body`, "css": `--typography-phone-body`},
      "sm": {"json": `sm`, "css": `--typography-phone-sm`},
      "xs": {"json": `xs`, "css": `--typography-phone-xs`},
    },
    "computer": {
      "h1": {"json": `h1`, "css": `--typography-computer-h1`},
      "h2": {"json": `h2`, "css": `--typography-computer-h2`},
      "h3": {"json": `h3`, "css": `--typography-computer-h3`},
      "h4": {"json": `h4`, "css": `--typography-computer-h4`},
      "h5": {"json": `h5`, "css": `--typography-computer-h5`},
      "h6": {"json": `h6`, "css": `--typography-computer-h6`},
      "body": {"json": `body`, "css": `--typography-computer-body`},
      "sm": {"json": `sm`, "css": `--typography-computer-sm`},
      "xs": {"json": `xs`, "css": `--typography-computer-xs`},
    }
  }
};

describe('vds tests', () => {

  it('sanity - contains at least one: vds in JSON file', async () => {
    const file = await promises.readFile(jsonVDSOutputFilePath, 'utf-8');
    expect(file).toContain(`vds`);
    expect(file).toContain(tokenTestObject.vds.color.json);
    expect(file).toContain(tokenTestObject.vds.fontSizeMap.json);
    expect(file).toContain(tokenTestObject.vds.mediaQuery.json);
  });

  it('sanity - contains at least one: typography in JSON file', async () => {
    const file = await promises.readFile(jsonTypographyOutputFilePath, 'utf-8');
    expect(file).toContain(`typography`);
    expect(file).toContain(tokenTestObject.typography.phone.h1.json);
    expect(file).toContain(tokenTestObject.typography.phone.h2.json);
    expect(file).toContain(tokenTestObject.typography.phone.h3.json);
    expect(file).toContain(tokenTestObject.typography.phone.h4.json);
    expect(file).toContain(tokenTestObject.typography.phone.h5.json);
    expect(file).toContain(tokenTestObject.typography.phone.h6.json);
    expect(file).toContain(tokenTestObject.typography.phone.body.json);
    expect(file).toContain(tokenTestObject.typography.phone.sm.json);
    expect(file).toContain(tokenTestObject.typography.phone.xs.json);
    expect(file).toContain(tokenTestObject.typography.computer.h1.json);
    expect(file).toContain(tokenTestObject.typography.computer.h2.json);
    expect(file).toContain(tokenTestObject.typography.computer.h3.json);
    expect(file).toContain(tokenTestObject.typography.computer.h4.json);
    expect(file).toContain(tokenTestObject.typography.computer.h5.json);
    expect(file).toContain(tokenTestObject.typography.computer.h6.json);
    expect(file).toContain(tokenTestObject.typography.computer.body.json);
    expect(file).toContain(tokenTestObject.typography.computer.sm.json);
    expect(file).toContain(tokenTestObject.typography.computer.xs.json);
  });

  it('sanity - contains at least one: vds + typography in CSS file', async () => {
    const file = await promises.readFile(cssOutputFilePath, 'utf-8');
    // vds tokens
    expect(file).toContain(tokenTestObject.vds.color.css);
    expect(file).toContain(tokenTestObject.vds.fontSizeMap.css);
    expect(file).toContain(tokenTestObject.vds.mediaQuery.css);
    // typography tokens
    expect(file).toContain(tokenTestObject.typography.phone.h1.json);
    expect(file).toContain(tokenTestObject.typography.phone.h2.json);
    expect(file).toContain(tokenTestObject.typography.phone.h3.json);
    expect(file).toContain(tokenTestObject.typography.phone.h4.json);
    expect(file).toContain(tokenTestObject.typography.phone.h5.json);
    expect(file).toContain(tokenTestObject.typography.phone.h6.json);
    expect(file).toContain(tokenTestObject.typography.phone.body.json);
    expect(file).toContain(tokenTestObject.typography.phone.sm.json);
    expect(file).toContain(tokenTestObject.typography.phone.xs.json);
    expect(file).toContain(tokenTestObject.typography.computer.h1.json);
    expect(file).toContain(tokenTestObject.typography.computer.h2.json);
    expect(file).toContain(tokenTestObject.typography.computer.h3.json);
    expect(file).toContain(tokenTestObject.typography.computer.h4.json);
    expect(file).toContain(tokenTestObject.typography.computer.h5.json);
    expect(file).toContain(tokenTestObject.typography.computer.h6.json);
    expect(file).toContain(tokenTestObject.typography.computer.body.json);
    expect(file).toContain(tokenTestObject.typography.computer.sm.json);
    expect(file).toContain(tokenTestObject.typography.computer.xs.json);
  });

});
