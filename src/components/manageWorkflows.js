import * as React from 'react';

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { PrimaryButton } from 'office-ui-fabric-react';
import '../css/workflows.css';

const iconProps = { iconName: 'Search' };

const filterOptions = [
  { key: 'All', text: 'ALL', data: { icon: 'FilterSolid' } },
  { key: 'Completed', text: 'COMPLETED', data: { icon: 'Filter' } },
  { key: 'Pending', text: 'PENDING', data: { icon: 'Filter' } }
];

const dropdownStyles = { dropdown: { width: 200 } };
const iconStyles = { marginRight: '8px' };

const onRenderOption = (option) => {
  return (
    <div>
      {option.data && option.data.icon && (
        <Icon style={iconStyles} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
      )}
      <span>{option.text}</span>
    </div>
  );
};

const onRenderTitle = (options) => {
  const option = options[0];

  return (
    <div>
      {option.data && option.data.icon && (
        <Icon style={iconStyles} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
      )}
      <span>{option.text}</span>
    </div>
  );
};

const onRenderPlaceholder = (props) => {
  return (
    <div className="dropdownExample-placeholder">
      <Icon style={iconStyles} iconName={'FilterSolid'} aria-hidden="true" />
      <span>{props.placeholder}</span>
    </div>
  );
};


function Workflows(props) {
  const [searchText, setSearchText] = React.useState('');

  const searchTextChangeHandler = (e, newVal) => {
    setSearchText(newVal);
    props.setSearchText(newVal);
  }

  const manageWorkflows =
    <div className='manageWorkflows'>
      <div className="controls">
        <TextField placeholder="Search workflows"
          iconProps={iconProps}
          value={searchText}
          style={{ width: '300px' }}
          onChange = {searchTextChangeHandler} />
      </div>
      <div className="controls flexer">
        <Dropdown
          placeholder="Filter"
          ariaLabel="Filter workflows by name"
          onRenderPlaceholder={onRenderPlaceholder}
          onRenderTitle={onRenderTitle}
          onRenderOption={onRenderOption}
          styles={dropdownStyles}
          options={filterOptions}
          onChange={(e, item) => props.setFilter(item.key)}
        />
      </div>
      <div className="controls">
        <PrimaryButton text="Create workflow"
          iconProps={{ iconName: 'Add' }}
          style={{ height: '30px', backgroundColor: 'green' }}
          onClick={() => { props.history.push('/workflows/' + 0) }} />
      </div>
    </div>;
  return manageWorkflows;
}

export default Workflows;
