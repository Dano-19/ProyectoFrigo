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

    // Asignación de 'Fecha' con formato ISO
    const fecha = new Date(createCategoriaDto.Fecha);
    categoria.fecha = !isNaN(fecha.getTime()) ? fecha : new Date(); // Asignar la fecha actual si no es válida

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
    const categoria = await this.categoriaRepository.findOne({
      where: { id: id },
    });
    if (!categoria) {
      throw new Error('Categoría no encontrada');
    }
    return categoria;
  }

  // Método para actualizar una categoría
  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.findOne(id);  // Verificar que la categoría exista

    // Actualización de campos
    const updateData: Partial<Categoria> = {
      ...updateCategoriaDto,
      // Se puede agregar lógica extra de actualización si es necesario
      Cantidad: isNaN(Number(updateCategoriaDto.Cantidad)) 
        ? 0 
        : Number(updateCategoriaDto.Cantidad),  // Convertir a número si es necesario
    };

    // Actualizar la categoría en la base de datos
    await this.categoriaRepository.update(id, updateData);
    return this.findOne(id);  // Retornar la categoría actualizada
  }

  // Método para eliminar una categoría
  async remove(id: number) {
    const categoria = await this.findOne(id);  // Verificar que la categoría exista
    return await this.categoriaRepository.delete(id);
  }
}
