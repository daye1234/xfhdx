/*
 * Created: 2020-03-11 21:56:47
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description:
 */
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import NodeCache from 'node-cache';
import crypto from 'crypto';
import { get, merge, isEmpty } from 'lodash';

const cache = new NodeCache();

const MANIFEST_CACHE_KEY_PREFIX = 'MANIFEST_CACHE_KEY_';
const SERVER_CONF_KEY = 'pitrix-server-conf-key';
const STATIC_VERSION_CACHE_KEY = 'STATIC_VERSION_CACHE_KEY';

const root = (dir: string): string => {
  if (process.env.NODE_ENV === 'development') {
    return `${path.resolve(__dirname, '../../')}/${dir}`.replace(/(\/+)/g, '/');
  } else {
    return `${path.resolve(__dirname, '../')}/${dir}`.replace(/(\/+)/g, '/');
  }
};

/**
 *
 * @param filePath
 * @returns {*} json formatted content
 */
const loadYaml = (filePath: string): any => {
  try {
    return yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    console.warn(e);
    return false;
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const checkSum = (data: any, algorithm?: any, encoding?: any) => {
  crypto
    .createHash(algorithm || 'md5')
    .update(data, 'utf8')
    .digest(encoding || 'hex');
};

const isValidReferer = (path: string) =>
  !isEmpty(path) && path !== '/' && path.indexOf('/login') === -1;

const getFileVersion = (filename: string): string => {
  if (process.env.NODE_ENV === 'development') {
    return '';
  }

  let versionCache = cache.get(STATIC_VERSION_CACHE_KEY);
  if (!versionCache) {
    versionCache = {};
    cache.set(STATIC_VERSION_CACHE_KEY, versionCache);
  }

  if (!versionCache[filename]) {
    const data = fs.readFileSync(root(filename));

    const version = checkSum(data);
    versionCache[filename] = version;

    cache.set(STATIC_VERSION_CACHE_KEY, versionCache);
  }

  return versionCache[filename] || '';
};

/**
 * get server side configuration
 *
 * @returns {*|{}}
 */
const getServerConfig = (key?: string | number): any => {
  let config = cache.get(SERVER_CONF_KEY);
  let tryFile;
  if (!config) {
    // parse config yaml
    // if (process.env.NODE_ENV === 'development') {
    //   config = loadYaml(root('server/config.yaml')) || {}
    //   tryFile = root('server/local_config.yaml')
    // } else {
    //   config = loadYaml(path.join(__dirname, '/config.yaml')) || {}
    //   tryFile = path.join(__dirname, '/local_config.yaml')
    // }

    if (process.env.NODE_ENV === 'development') {
      config = loadYaml(root('server/config.yaml')) || {};
    } else {
      config = loadYaml(root('server/prod.config.yaml')) || {};
    }

    // config = loadYaml(root('server/config.yaml')) || {}
    // const tryFile = root('server/local_config.yaml')
    if (fs.existsSync(tryFile)) {
      // merge local_config
      const localConfig = loadYaml(tryFile);
      if (typeof localConfig === 'object') {
        merge(config, localConfig);
      }
    }

    // if (GlobVar.ARGV.server) {
    //   merge(config, { server: GlobVar.ARGV.server })
    // }

    // if (GlobVar.ARGV.client) {
    //   merge(config, { client: GlobVar.ARGV.client })
    // }

    cache.set(SERVER_CONF_KEY, config);
  }
  return key ? config[key] : config;
};
const getManifest = (entry: any) => {
  let manifestCache = cache.get(`${MANIFEST_CACHE_KEY_PREFIX}${entry}`);

  if (!manifestCache) {
    let data = {};
    try {
      const dataStream = fs.readFileSync(root('dist/manifest.json'));
      data = safeParseJSON(dataStream.toString(), {});
    } catch (error) {}
    manifestCache = get(data, `entrypoints.${entry}.assets`);
    cache.set(`${MANIFEST_CACHE_KEY_PREFIX}${entry}`, manifestCache);
  }

  return manifestCache;
};
const safeParseJSON = (json: any, defaultValue: any) => {
  let result;
  try {
    result = JSON.parse(json);
  } catch (e) {}

  if (!result && defaultValue !== undefined) {
    return defaultValue;
  }
  return result;
};
const decryptPassword = (encrypted: string, salt: string) => {
  const specialToken = '@';
  const specialIndex = encrypted.indexOf(specialToken);
  if (specialIndex === -1 || !salt) {
    return encrypted;
  }

  const prefix = encrypted.slice(0, specialIndex);
  const pure = encrypted.slice(specialIndex + specialToken.length);
  const signs = Buffer.from(prefix, 'base64').toString('utf-8');

  let index = 0;
  let b64 = '';

  for (const letter of pure) {
    const todel = index < salt.length ? salt[index] : b64[index - salt.length];
    let code = letter.charCodeAt(0) * 2 - todel.charCodeAt(0);
    if (signs[index] === '1') {
      code += 1;
    }
    if (code !== 64) {
      b64 += String.fromCharCode(code);
    }
    index++;
  }

  return Buffer.from(b64, 'base64').toString('utf-8');
};

export {
  getServerConfig,
  root,
  getFileVersion,
  checkSum,
  isValidReferer,
  getManifest,
  decryptPassword
};
