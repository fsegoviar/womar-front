import { ReactNode } from 'react';
import {
  CategoriesResponsive,
  ContainCategories,
  PageBase
} from '../../../components';
import { Grid } from '@mui/material';

type TemplatePageType = {
  children: ReactNode;
};

export const TemplatePage = ({ children }: TemplatePageType) => {
  return (
    <PageBase>
      <Grid container>
        <Grid item xs={12} md={12} className="px-5 sm:px-10">
          <Grid container sx={{ my: 5 }} spacing={2}>
            {children}
            <section className="hidden sm:flex my-10 flex-col justify-center items-center w-full md:flex-row ">
              <ContainCategories />
            </section>
            <section className="my-5 flex sm:hidden justify-center ">
              <CategoriesResponsive />
            </section>
          </Grid>
        </Grid>
      </Grid>
    </PageBase>
  );
};
