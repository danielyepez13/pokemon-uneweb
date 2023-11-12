import { describe, test, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux'
import store from '../redux/store';
import Filters from '../components/filters/Filters';

describe("Test de Filtros", () => {
    test('Muestra correctamente la etiqueta select que carga el filtro de tipo', async () => {
        render(
            <Provider store={store}>
                <Filters />
            </Provider>
        );
        await waitFor(() => {
            expect(screen.getByText("fire")).toBeDefined();
            expect(screen.getByText("water")).toBeDefined();
            expect(screen.getByText("grass")).toBeDefined();
        })
    });
    test("Muestra correctamente la etiqueta select que carga el filtro de origen", async () => {
        render(
            <Provider store={store}>
                <Filters />
            </Provider>
        );
        await waitFor(() => {
            expect(screen.getByText("API")).toBeDefined();
            expect(screen.getByText("DataBase")).toBeDefined();
        })
    })
});

describe("Test de Ordenamientos", () => {
    test('Muestra correctamente la etiqueta select que carga el ordenamiento alfabético', async () => {
        render(
            <Provider store={store}>
                <Filters />
            </Provider>
        );
        await waitFor(() => {
            expect(screen.getByText("A-Z")).toBeDefined();
            expect(screen.getByText("Z-A")).toBeDefined();
        })
    });
    test("Muestra correctamente la etiqueta select que carga el ordenamiento por ataque", async () => {
        render(
            <Provider store={store}>
                <Filters />
            </Provider>
        );
        await waitFor(() => {
            expect(screen.getByText("ASC")).toBeDefined();
            expect(screen.getByText("DESC")).toBeDefined();
        })
    })
});