package illicodraco.project.repositories;

import illicodraco.project.beans.Parametres;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// Interface java gérant le repository des Parametres
public interface ParametresRepository extends JpaRepository<Parametres, Integer> {

  Parametres save(Parametres params);

  Optional<Parametres> findById(Integer id);

  List<Parametres> findAll();

  long count();

}
