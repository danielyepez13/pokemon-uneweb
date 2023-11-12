import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormField from '../components/form/FormField';

describe("Test de inputs del formulario", () => {
    test('El componente muestra el label que enseña el nombre del Pokemon', () => {
        render(<FormField
            nameLabel="Nombre del pokemon"
            name="nombre"
            type="text"
        />);
        expect(screen.getByLabelText("Nombre del pokemon")).toBeDefined();
    });
    test("Si se coloca obligatorio, enseña un asterisco indicando al usuario que es necesario el campo", () => {
        render(<FormField
            required={true}
            nameLabel="Nombre del pokemon"
            name="nombre"
            type="text"
        />);
        expect(screen.getByLabelText("Nombre del pokemon *")).toBeDefined();
    })
});