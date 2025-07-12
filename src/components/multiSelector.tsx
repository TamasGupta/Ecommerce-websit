import CreatableSelect from "react-select/creatable";
import { Controller } from "react-hook-form";

const TagSelector = ({ name, control, defaultOptions },{name:any}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <CreatableSelect
          {...field}
          isMulti
          options={defaultOptions}
          value={field.value?.map((tag) => ({
            label: tag,
            value: tag,
          }))}
          onChange={(newValue) => field.onChange(newValue.map((v) => v.value))}
        />
      )}
    />
  );
};

export default TagSelector;
