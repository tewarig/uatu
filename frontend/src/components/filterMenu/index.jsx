import { Menu } from 'antd';

const FilterMenu = () => (
  <Menu
    style={{ width: 256 }}
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['sub1']}
    mode="inline"
  >
    {/* Your Menu Items Here */}
  </Menu>
);
export default FilterMenu;