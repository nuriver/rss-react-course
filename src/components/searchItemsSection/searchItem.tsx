export default function SearchItem(): JSX.Element {
  return (
    <div className="search-item">
      <div className="search-item-image"></div>
      <p className="search-item-name">
        <span>Name: </span>
        {/* add data from server */}
      </p>
      <p className="search-item-descriptor">
        <span>Diameter: </span>
        {/* add data from server */}
      </p>
      <p className="search-item-descriptor">
        <span>Climate: </span>
        {/* add data from server */}
      </p>
      <p className="search-item-descriptor">
        <span>Terrain: </span>
        {/* add data from server */}
      </p>
      <p className="search-item-descriptor">
        <span>Population: </span>
        {/* add data from server */}
      </p>
    </div>
  );
}
