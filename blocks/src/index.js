import { registerBlockType } from '@wordpress/blocks';
import { TextControl, PanelBody, PanelRow } from '@wordpress/components';
import { InspectorControls, MediaUpload } from '@wordpress/block-editor'; // Mejorar experiencia con SSR
import ServerSideRender from '@wordpress/server-side-render';


registerBlockType(
	'pgb/basic-block', // as registered ad functions.php
	{
		title: 'Basic Block',
		description: 'Este es nuestro primer bloque',
		icon: 'smiley',
		category: 'layout',
		attributes: {
			content: {
				type: "string",
				default: "Hello World"
			}
		},

		// Mostrar como lo vamos a ver en el editor
		edit: (props) => {
			// Todos los bloques tienen estas 4 propiedades
			const { attributes : {content}, setAttributes, className, isSelected} = props;

			// Función para guardar el atributo content
			const handlerOnChangeInput = (newContent) => {
				setAttributes({content: newContent }) // cada vez que cambie el valor del input, lo veamos reflejado en los atributos
			}

			// Funcion para guardar el atributo mediaURL y mediaAlt
			const handlerOnSelectMediaUpload = (image) => {
				setAttributes({
					mediaURL: image.sizes.full.url,
					mediaAlt: image.alt
				})
			}

			return <>
				<InspectorControls>
					<PanelBody // Primer panel en el sidebar
						title="Modificar texto del Bloque Básico"
						initialOpen={ true }
					> 
						<PanelRow>
							<TextControl
								label="Complete el campo" // Indicaciones del campo
								value={ content } // Asignacion del atributo correspondiente
								onChange= {handlerOnChangeInput} // Asignacion de funcion para gestino el evento onchange
							/>
						</PanelRow>
					</PanelBody>
					<PanelBody // Segundo panel en el sidebar
						title="Selecciona una imagen"
						initialOpen = {true}
					>
						<PanelRow>
							<MediaUpload
								onSelect = {handlerOnSelectMediaUpload } // Asignación de función para gestionar el evento OnSelect
								type = "image" // Limita los tipos de archivos que se pueden seleccionar
								// Se envia el evento open y el renderizado del elemento que desencadenará la apertura de la librería, en este caso un btn
								render = { ({open}) => {
									// Agregamos las clases de los btns de WP habituales para que mantenga el estilo en el editor
									return <Button className="components-icon-button image-block-btn is-button is-default is-large" onClick={open}>
										Elegir una imagen
									</Button>;
								}}
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>

				<ServerSideRender // renderizado del bloque dinamico
					block="pgb/basic-block" // Nombre del bloque
					attributes= {props.attributes} // Se envían todos los atributos
				/>
			</>
		}, 
		// ahora que usamos bloques dinamicos, hacemos save: null!
		save: () => null
		
	}
)