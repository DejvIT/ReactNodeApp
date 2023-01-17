import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ItemDetail from '../components/catalog/ItemDetail'
import {Primary} from "./Button.stories";

export default {
  title: 'Example/Machine',
  component: ItemDetail,
} as ComponentMeta<typeof ItemDetail>;

const Template: ComponentStory<typeof ItemDetail> = (args) => <ItemDetail {...args} />;

export const Detail = Template.bind({});
