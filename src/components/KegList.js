import React from "react";
import Keg from "./Keg";
import PropTypes from 'prop-types';

function KegList(props) {
  // if (kegList == []) {
  //   <h1>No Kegs</h1>
  // }
  return (
    <React.Fragment>
      <h1><u>Menu</u></h1> 
      {props.kegList.map((keg) =>
        <Keg 
          whenKegClicked = { props.onKegSelection }
          kegName={keg.kegName} 
          kegBrand={keg.kegBrand}
          kegQuantity={keg.kegQuantity}
          kegAlcoholContent={keg.kegAlcoholContent}
          kegPrice={keg.kegPrice}
          id={keg.id}
          key={keg.id}
        />
      )}
      <br />
    </React.Fragment>
  );
}

KegList.propTypes = {
  kegList: PropTypes.array,
  onKegSelection: PropTypes.func
}
export default KegList;