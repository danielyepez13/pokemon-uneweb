import { describe, test, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import store from '../redux/store';
import Card from '../components/card/Card';

describe("Test de Card", () => {
    test("Renderiza correctamente toda la informacion del pokemon en la tarjeta", async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Card
                        id={2}
                        name="pikachu"
                        image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                        types={["fire"]}
                        vida={20}
                        attack={20}
                        defense={20}
                        speed={20}
                        selected={false}
                    />
                </BrowserRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText("pikachu")).toBeDefined();
        })
    })
})