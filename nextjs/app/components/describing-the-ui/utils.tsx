import { PersonProps } from './data';

export function getImageUrl(person: PersonProps, size = 's') {
  return (
    'https://react.dev/images/docs/scientists/' +
    person.imageId +
    size +
    '.jpg'
  );
}
