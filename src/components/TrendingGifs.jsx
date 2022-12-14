import { useTrending } from "../Hooks/useTrending";
import { Link } from "wouter";
import { Fragment } from "react";

const TrendingGifs = () => {
  const { trending } = useTrending();

  return (
    <div className="TrendingGifs">
      <h2 className="text-2xl font-bold">Trending Searches</h2>
      <ul className="grid grid-cols-3 my-8 gap-1">
        {trending.map((trend) => {
          return (
            <Fragment key={trend}>
              <Link to={`/gif/${trend}`}>
                <li className="cursor-pointer">{trend}</li>
              </Link>
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};
export default TrendingGifs;
