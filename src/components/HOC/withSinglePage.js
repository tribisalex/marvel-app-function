import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";

const withSingle = (BaseComponent, getData) => {

  return (props) => {
    const {id} = useParams();
    const [item, setItem] = useState(null);
    const {loading, error, getData, clearError} = useMarvelService();

    useEffect(() => {
      updateItem();
    }, [id]);

    const onLoaded = (item) => {
      setItem(item);
    };

    const updateItem = () => {
      clearError();
      getData(id).then(onLoaded);
    }

    return (
      <BaseComponent
        {...props}
        item={item}
        onLoaded={onLoaded}
        updateItem={updateItem}
        setItem={setItem}
      />
    );
  }
}

export default withSingle;
