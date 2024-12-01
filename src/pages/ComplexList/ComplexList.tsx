import { Container } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Complex, IComplex } from '../../components/Complex/Complex';

export const ComplexList = (): JSX.Element => {
  const [complexList, setComplexList] = useState<Array<IComplex>>();

  const fetchComplexList = useCallback(async (): Promise<void> => {
    const response = await axios.get<Array<IComplex>>('/api/v1/complex/');
    setComplexList(response.data);
  }, [complexList]);

  useEffect(() => {
    fetchComplexList();
  }, []);

  return (
    <Container>
      {complexList?.map((complex: IComplex) => (
        <Complex
          key={complex.id}
          id={complex.id}
          name={complex.name}
          description={complex.description}
          interval={complex.interval}
          price={complex.price}
        />
      ))}
    </Container>
  );
};
