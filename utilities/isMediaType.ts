import {
  Media as MediaType,
} from '../payload-types';

/**
 * typeguard for MediaType
 */
export function isMediaType(probe): probe is MediaType {
  return 'filename' in probe;
}

export default isMediaType;
