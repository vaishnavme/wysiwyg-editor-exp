let uuid = new Date().getTime();

export default function getUniqueID() {
  uuid++;
  return `wys-${uuid.toString(16)}`;
}
