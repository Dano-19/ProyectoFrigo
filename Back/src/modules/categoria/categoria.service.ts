import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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

  // Crear una nueva categoría
  async create(createCategoriaDto: CreateCategoriaDto) {
    const categoria = new Categoria();

    // Fecha en formato válido
    const Fecha = new Date(createCategoriaDto.fecha);
    categoria.fecha = !isNaN(Fecha.getTime()) ? Fecha : new Date();

    // … asignas fecha, area, marca, …
    categoria.materiales = createCategoriaDto.materiales;
    categoria.acciones  = createCategoriaDto.acciones;

    // Asignación de campos
    categoria.horaIngreso = createCategoriaDto.horaIngreso;
    categoria.horaSalida  = createCategoriaDto.horaSalida;
    categoria.area = createCategoriaDto.area;
    categoria.marca = createCategoriaDto.marca;
    categoria.modelo = createCategoriaDto.modelo;
    categoria.tipo = createCategoriaDto.tipo;
    categoria.descripcion = createCategoriaDto.descripcion;

    // Asegurarse que la cantidad sea un número positivo
    const cantidad = Number(createCategoriaDto.cantidad);
    categoria.cantidad = isNaN(cantidad) || cantidad < 1 ? 0 : cantidad;

    categoria.materiales = createCategoriaDto.materiales;
    categoria.acciones = createCategoriaDto.acciones;

    return await this.categoriaRepository.save(categoria);
  }

  // Listar todas las categorías
  async findAll() {
    return await this.categoriaRepository.find({ order: { id: 'asc' } });
  }

  // Buscar por ID
  async findOne(id: number) {
    const categoria = await this.categoriaRepository.findOne({
      where: { id: id },
    });
    if (!categoria) {
      throw new Error('Categoría no encontrada');
    }
    return categoria;
  }

  async remove(id: number) {
    const categori = await this.categoriaRepository.findOneBy({ id });
    if (!categori) {
      throw new BadRequestException(`categori ${id} not found`);
    }
    await this.categoriaRepository.remove(categori);
    return `categori eliminated successfully: #${id}`;
  }

  

  
  async update(id: number, updateDto: UpdateCategoriaDto): Promise<Categoria> {
    // 1) Buscar la entidad existente
    const categoria = await this.categoriaRepository.findOne({ where: { id } });
    if (!categoria) {
      throw new BadRequestException(`Categoría con id ${id} no encontrada`);
    }

    
    // 2) Aplicar sólo los campos que vienen en el DTO
    await this.categoriaRepository.update(id, updateDto);

    // 3) Retornar la entidad ya actualizada
    return this.categoriaRepository.findOne({ where: { id } });
  }

}