import type { Meta, StoryObj } from '@storybook/vue3'
import Button from './Button.vue'

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' }
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    type: 'button'
  }
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: `<Button v-bind="args">Primary action</Button>`
  })
}

export const WithIcon: Story = {
  args: {
    variant: 'outline',
    size: 'md',
    disabled: false
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: `
      <Button v-bind="args">
        <template #icon>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" stroke="currentColor" stroke-width="2" />
          </svg>
        </template>
        With icon
      </Button>
    `
  })
}

export const Disabled: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    disabled: true
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: `<Button v-bind="args">Disabled state</Button>`
  })
}
