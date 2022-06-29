import fs from "fs";

const fixtureFolder = './src/test/fixtures/';

export const fixture = async fixture => fs.promises.readFile(fixtureFolder + fixture, { encoding: 'utf-8' });
