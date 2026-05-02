import "./styles/HeroAvatar.css";

const HeroAvatar = () => {
  return (
    <div className="hero-avatar" aria-hidden="true">
      <div className="hero-avatar-rim" />
      <img
        className="hero-avatar-img"
        src="/images/avatar.png"
        alt=""
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

export default HeroAvatar;

