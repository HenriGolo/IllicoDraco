package illicodraco.project.repositories;

import illicodraco.project.beans.Classe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// Interface java gérant le repository des Classes
public interface ClasseRepository extends JpaRepository<Classe, String> {

  Classe save(Classe classe);

  Optional<Classe> findById(String id);

  List<Classe> findAll();

  long count();

}
