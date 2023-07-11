interface LinkProps {
  url: string;
}
const Link = ({ url }: LinkProps) => {
  return (
    <button>
      <a href={url} style={{ textDecoration: "none" }} download>
        Download Now
      </a>
    </button>
  );
};

export default Link;
