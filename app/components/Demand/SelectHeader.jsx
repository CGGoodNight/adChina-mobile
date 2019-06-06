import React from 'react';
import { SearchBar } from 'antd-mobile';

const SelectHeader = props => {
  return (
    <div>
      <SearchBar
        placeholder={props.isSearchFocus ? "输入id进行搜索" : "Search"}
        onFocus={ () => props.toggleFocusState() }
        onBlur={ () => props.toggleFocusState() }
        cancelText="分类搜索请点击"
        value={props.searchBarValue}
        onSubmit={ () => props.crossIdSearchDemand() }
        onChange={ (value) => props.onSearchBarChange(value) }
        onCancel={() => props.openShowModal("modal1")}
        maxLength={8} />
    </div>
  );
}

export default SelectHeader;