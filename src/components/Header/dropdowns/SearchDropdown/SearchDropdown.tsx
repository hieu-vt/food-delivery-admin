import React, { useEffect, useState } from 'react';
import { FilterIcon } from 'components/common/icons/FilterIcon';
import { SearchOverlay } from './SearchOverlay/SearchOverlay';
import { Dropdown } from 'antd';
import { DropdownHeader } from 'components/Header/Header.styles';
import { CategoryComponents } from 'components/Header/HeaderSearch/HeaderSearch';
import { Btn, InputSearch } from '../../HeaderSearch/HeaderSearch.styles';
import { useTranslation } from 'react-i18next';

interface SearchOverlayProps {
  query: string;
  setQuery: (query: string) => void;
  data: CategoryComponents[] | null;
  isOverlayVisible: boolean;
  setOverlayVisible: (state: boolean) => void;
}

export const SearchDropdown: React.FC<SearchOverlayProps> = ({
  query,
  setQuery,
  data,
  isOverlayVisible,
  setOverlayVisible,
}) => {
  const [isFilterVisible, setFilterActive] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    setOverlayVisible(!!query || isFilterVisible);
  }, [query, isFilterVisible, setOverlayVisible]);

  return (
    <>
      <Dropdown
        {...(!!data && { trigger: ['click'], onVisibleChange: setOverlayVisible })}
        overlayClassName="search-dropdown"
        overlay={<SearchOverlay data={data} isFilterVisible={isFilterVisible} />}
        visible={isOverlayVisible}
      >
        <DropdownHeader>
          <InputSearch
            value={query}
            placeholder={t('header.search')}
            filter={
              <Btn size="small" type="text" icon={<FilterIcon />} onClick={() => setFilterActive(!isFilterVisible)} />
            }
            onChange={(event) => setQuery(event.target.value)}
          />
        </DropdownHeader>
      </Dropdown>
    </>
  );
};