import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriaService {
  constructor(
    @Inject('CATEGORIA_REPOSITORY')
    private categoriaRepository: Repository<Categoria>,
  ) {}

  // Método para crear una nueva categoría
  async create(createCategoriaDto: CreateCategoriaDto) {
    const categoria = new Categoria();

    // Validación y asignación de 'Fecha'
    const fecha = new Date(createCategoriaDto.Fecha);
    categoria.fecha = isNaN(fecha.getTime()) ? new Date() : fecha; // Asignar la fecha actual si la fecha no es válida

    // Asignación directa de los demás campos
    categoria.area = createCategoriaDto.area;
    categoria.Marca = createCategoriaDto.Marca;
    categoria.Modelo = createCategoriaDto.Modelo;
    categoria.Tipo = createCategoriaDto.Tipo;
    categoria.descripcionTrabajo = createCategoriaDto.DescripciónTrabajo;

    // Validación y conversión de 'Cantidad' a número
    categoria.Cantidad = isNaN(Number(createCategoriaDto.Cantidad)) ? 0 : Number(createCategoriaDto.Cantidad);

    categoria.Material = createCategoriaDto.Materiales;
    categoria.Acciones = createCategoriaDto.Acciones;

    // Guardar la nueva categoría en la base de datos
    return await this.categoriaRepository.save(categoria);
  }

  // Método para obtener todas las categorías
  async findAll() {
    return await this.categoriaRepository.find({ order: { id: 'asc' } });
  }

  // Método para obtener una categoría por su ID
  async findOne(id: number) {
    return await this.categoriaRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  // Método para actualizar una categoría
  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const updateData: Partial<Categoria> = {
      ...updateCategoriaDto,
    };

    // Validación y conversión de 'Cantidad' a número, si está presente en los datos de actualización
    if (updateCategoriaDto.Cantidad !== undefined) {
      updateData.Cantidad = isNaN(Number(updateCategoriaDto.Cantidad)) 
        ? 0 
        : Number(updateCategoriaDto.Cantidad);  // Convertir a número
    }

    // Actualizar la categoría en la base de datos
    return await this.categoriaRepository.update(id, updateData);
  }

  // Método para eliminar una categoría
  async remove(id: number) {
    return await this.categoriaRepository.delete(id);
  }
}
