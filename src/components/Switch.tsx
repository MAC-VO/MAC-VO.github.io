import { Switch } from '@headlessui/react'

type ExternalSwitchProps = {
  state: boolean
  switch_state: () => void
}

function ExternalSwitch({ state, switch_state }: ExternalSwitchProps) {
  return (
    <Switch
      checked={state}
      onChange={switch_state}
      className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition data-[checked]:bg-primary-500"
    >
      <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
    </Switch>
  );
}

export default ExternalSwitch;
