// import React, { useState } from 'react';
// import { Select } from '@radix-ui/react-select';

// function SelectExample() {
//   const [selectedValue, setSelectedValue] = useState('');

//   const handleSelectChange = (item) => {
//     setSelectedValue(item.value);
//   };

//   const options = [
//     { label: 'Apple', value: 'apple' },
//     { label: 'Banana', value: 'banana' },
//     { label: 'Orange', value: 'orange' },
//   ];

//   return (
//     <div>
//       <h1>Select Example with Radix UI</h1>
//       <Select value={selectedValue} onValueChange={handleSelectChange}>
//         {options.map((option) => (
//           <Select.Option key={option.value} value={option.value}>
//             {option.label}
//           </Select.Option>
//         ))}
//       </Select>
//       <p>Selected Value: {selectedValue}</p>
//     </div>
//   );
// }

// export default SelectExample;
