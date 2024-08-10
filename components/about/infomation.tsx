interface Props {
  name: string;
  title: string;
  phone: string;
  email: string;
  address: string;
}
const Information = ({ name, title, phone, email, address }: Props) => {
  return (
    <>
      <div className="mt-10 font-semibold text-primary dark:text-white">
        <span>{name}</span>
        <br />
        <span>Chức danh: {title}</span>
        <br />
        <span>SĐT: {phone}</span>
        <br />
        <span>Email: {email}</span>
        <br />
        <span>Địa chỉ cty: {address}</span>
      </div>
    </>
  );
};
export default Information;
