import { Container } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Complex, IComplex } from '../../components/Complex/Complex';

export const ComplexList = (): JSX.Element => {
  const [complexList, setComplexList] = useState<Array<IComplex>>();

  const fetchComplexList = (): void => {
    axios
      .get<Array<IComplex>>('/api/v1/complex/')
      .then((response: AxiosResponse<Array<IComplex>>) => {
        setComplexList(response.data);
      });
  };

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
